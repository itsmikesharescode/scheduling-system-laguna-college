-- Drop triggers first
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_auth_user_updated on auth.users;

-- Then drop the functions
drop function if exists on_auth_user_created();
drop function if exists on_auth_user_updated();


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


-- inserts a row into public.profiles
create function on_auth_user_updated()
returns trigger as $$
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
$$ language plpgsql security definer;

-- trigger the function every time a user is updated
create trigger on_auth_user_updated
after update on auth.users
for each row execute procedure on_auth_user_updated();

