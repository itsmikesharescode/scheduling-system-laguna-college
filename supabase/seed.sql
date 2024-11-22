

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."admin_get_assignable_students"("teacher_id" "uuid") RETURNS TABLE("user_id" "uuid", "created_at" timestamp with time zone, "user_meta_data" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
begin
    return query
    select 
        s.user_id,
        s.created_at,
        s.user_meta_data
    from students_tb s
    where not exists (
        select 1 
        from assigned_students_tb a 
        where a.student_id = s.user_id 
        and a.teacher_id = admin_get_assignable_students.teacher_id
    )
    order by s.created_at desc;
end;
$$;


ALTER FUNCTION "public"."admin_get_assignable_students"("teacher_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_dashboard_counts"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
declare
    student_count integer;
    teacher_count integer;
    report_count integer;
begin
    -- Get count of students
    select count(*) into student_count
    from students_tb;
    
    -- Get count of teachers
    select count(*) into teacher_count
    from teachers_tb;
    
    -- Get count of reports
    select count(*) into report_count
    from reports_tb;
    
    -- Return counts as JSON with coalesce to handle nulls
    return jsonb_build_object(
        'student_count', coalesce(student_count, 0),
        'teacher_count', coalesce(teacher_count, 0),
        'report_count', coalesce(report_count, 0)
    );
end;
$$;


ALTER FUNCTION "public"."get_dashboard_counts"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    return exists (
        select 1 from roles_tb where user_id = auth.uid() and role = 'admin' 
    );
end;
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_student"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    return exists (
        select 1 from roles_tb where user_id = auth.uid() and role = 'student'
    );
end;
$$;


ALTER FUNCTION "public"."is_student"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_teacher"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    return exists (
        select 1 from roles_tb where user_id = auth.uid() and role = 'teacher'
    );
end;
$$;


ALTER FUNCTION "public"."is_teacher"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."on_auth_user_created"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  role text;
begin
  role = new.raw_user_meta_data ->> 'role'; 

  insert into public.roles_tb(user_id, role) values(new.id, role);
  insert into public.users_tb(user_id, user_meta_data) values(new.id, new.raw_user_meta_data);

  if role = 'teacher' then
    insert into public.teachers_tb(user_id, user_meta_data) values(
      new.id, 
      new.raw_user_meta_data
    );
    
    return new;
  elsif role = 'student' then
    insert into public.students_tb(user_id, user_meta_data) values(
      new.id, 
      new.raw_user_meta_data
    );
    
    return new;
  elsif role = 'admin' then
    return new;
  end if;
end;
$$;


ALTER FUNCTION "public"."on_auth_user_created"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."on_auth_user_updated"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  role text;
begin
  role = new.raw_user_meta_data ->> 'role';

  update public.users_tb
  set user_meta_data = new.raw_user_meta_data
  where user_id = new.id;

  if role = 'teacher' then
    update public.teachers_tb
    set user_meta_data = new.raw_user_meta_data
    where user_id = new.id;
    return new;
  elsif role = 'student' then
    update public.students_tb
    set user_meta_data = new.raw_user_meta_data
    where user_id = new.id;
    return new;
  elsif role = 'admin' then
    return new;
  end if;
end;
$$;


ALTER FUNCTION "public"."on_auth_user_updated"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."assigned_students_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "teacher_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL
);


ALTER TABLE "public"."assigned_students_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."assigned_students_tb" IS 'list of assigned students';



ALTER TABLE "public"."assigned_students_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."assigned_students_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."reminders_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "time" "text" NOT NULL
);


ALTER TABLE "public"."reminders_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."reminders_tb" IS 'list of reminders';



ALTER TABLE "public"."reminders_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reminders_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."reports_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" character varying NOT NULL,
    "user_id" "uuid" NOT NULL,
    "reporter_id" "text" NOT NULL,
    "message" "text" NOT NULL,
    "reference_id" "text" NOT NULL
);


ALTER TABLE "public"."reports_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."reports_tb" IS 'list of reports';



ALTER TABLE "public"."reports_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reports_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."roles_tb" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "role" character varying NOT NULL
);


ALTER TABLE "public"."roles_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."roles_tb" IS 'list of roles';



CREATE TABLE IF NOT EXISTS "public"."students_tb" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_meta_data" "jsonb" NOT NULL
);


ALTER TABLE "public"."students_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."students_tb" IS 'list of students';



CREATE TABLE IF NOT EXISTS "public"."teachers_tb" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_meta_data" "jsonb" NOT NULL
);


ALTER TABLE "public"."teachers_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."teachers_tb" IS 'list of teachers';



CREATE TABLE IF NOT EXISTS "public"."users_tb" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_meta_data" "jsonb" NOT NULL
);


ALTER TABLE "public"."users_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."users_tb" IS 'all users';



ALTER TABLE ONLY "public"."assigned_students_tb"
    ADD CONSTRAINT "assigned_students_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reminders_tb"
    ADD CONSTRAINT "reminders_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reports_tb"
    ADD CONSTRAINT "reports_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."roles_tb"
    ADD CONSTRAINT "roles_tb_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."students_tb"
    ADD CONSTRAINT "students_tb_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."teachers_tb"
    ADD CONSTRAINT "teachers_tb_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."users_tb"
    ADD CONSTRAINT "users_tb_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."assigned_students_tb"
    ADD CONSTRAINT "assigned_students_tb_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."assigned_students_tb"
    ADD CONSTRAINT "assigned_students_tb_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reminders_tb"
    ADD CONSTRAINT "reminders_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reports_tb"
    ADD CONSTRAINT "reports_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."roles_tb"
    ADD CONSTRAINT "roles_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."students_tb"
    ADD CONSTRAINT "students_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."teachers_tb"
    ADD CONSTRAINT "teachers_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users_tb"
    ADD CONSTRAINT "users_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow all if admin" ON "public"."assigned_students_tb" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Allow all if admin" ON "public"."reminders_tb" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Allow all if admin" ON "public"."reports_tb" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Allow delete if teacher or student" ON "public"."reports_tb" FOR DELETE TO "authenticated" USING ((("public"."is_teacher"() AND ("auth"."uid"() = "user_id")) OR ("public"."is_student"() AND ("auth"."uid"() = "user_id"))));



CREATE POLICY "Allow insert if student" ON "public"."reports_tb" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_student"() OR "public"."is_teacher"()));



CREATE POLICY "Allow select if admin" ON "public"."students_tb" FOR SELECT TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Allow select if admin" ON "public"."teachers_tb" FOR SELECT TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Allow select if teacher or student" ON "public"."reports_tb" FOR SELECT TO "authenticated" USING ((("public"."is_teacher"() AND ("auth"."uid"() = "user_id")) OR ("public"."is_student"() AND ("auth"."uid"() = "user_id"))));



CREATE POLICY "Select for teacher and student" ON "public"."users_tb" FOR SELECT TO "authenticated" USING ((("public"."is_teacher"() AND ("auth"."uid"() = "user_id")) OR ("public"."is_student"() AND ("auth"."uid"() = "user_id")) OR "public"."is_admin"()));



ALTER TABLE "public"."assigned_students_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reminders_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reports_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."roles_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."students_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."teachers_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users_tb" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





























































































































































































GRANT ALL ON FUNCTION "public"."admin_get_assignable_students"("teacher_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."admin_get_assignable_students"("teacher_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_get_assignable_students"("teacher_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_dashboard_counts"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_dashboard_counts"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_dashboard_counts"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_student"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_student"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_student"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_teacher"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_teacher"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_teacher"() TO "service_role";



GRANT ALL ON FUNCTION "public"."on_auth_user_created"() TO "anon";
GRANT ALL ON FUNCTION "public"."on_auth_user_created"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."on_auth_user_created"() TO "service_role";



GRANT ALL ON FUNCTION "public"."on_auth_user_updated"() TO "anon";
GRANT ALL ON FUNCTION "public"."on_auth_user_updated"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."on_auth_user_updated"() TO "service_role";


















GRANT ALL ON TABLE "public"."assigned_students_tb" TO "anon";
GRANT ALL ON TABLE "public"."assigned_students_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."assigned_students_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."assigned_students_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."assigned_students_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."assigned_students_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."reminders_tb" TO "anon";
GRANT ALL ON TABLE "public"."reminders_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."reminders_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reminders_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reminders_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reminders_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."reports_tb" TO "anon";
GRANT ALL ON TABLE "public"."reports_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."reports_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reports_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reports_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reports_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."roles_tb" TO "anon";
GRANT ALL ON TABLE "public"."roles_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."roles_tb" TO "service_role";



GRANT ALL ON TABLE "public"."students_tb" TO "anon";
GRANT ALL ON TABLE "public"."students_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."students_tb" TO "service_role";



GRANT ALL ON TABLE "public"."teachers_tb" TO "anon";
GRANT ALL ON TABLE "public"."teachers_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."teachers_tb" TO "service_role";



GRANT ALL ON TABLE "public"."users_tb" TO "anon";
GRANT ALL ON TABLE "public"."users_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."users_tb" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
