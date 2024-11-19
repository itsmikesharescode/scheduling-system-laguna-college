create function on_auth_user_created()
returns trigger as $$
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
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure on_auth_user_created();
