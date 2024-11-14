create function on_auth_user_created()
returns trigger as $$
declare
  role text;
begin
  role = new.raw_user_meta_data ->> 'role'; 

  insert into public.teachers_tb (teacher_id, teacher_real_id, user_meta_data)
  values (
    new.id,
    new.raw_user_meta_data ->> 'teacher_real_id',
    new.raw_user_meta_data
  );
  insert into public.role_tb (user_id, role) values(new.id, role);
  return new;

end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure on_auth_user_created();
