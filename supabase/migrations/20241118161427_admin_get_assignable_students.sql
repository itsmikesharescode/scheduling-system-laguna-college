create or replace function admin_get_assignable_students(
    teacher_id uuid
) returns table (
    user_id uuid,
    created_at timestamptz,
    user_meta_data jsonb
) as $$
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
$$ language plpgsql;