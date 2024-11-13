-- inserts a row into public.profiles
create function on_auth_user_updated()
returns trigger as $$
begin

  update public.teachers_tb
  set user_meta_data = new.raw_user_meta_data
  where teacher_id = new.id;
  return new;

end;
$$ language plpgsql security definer;

-- trigger the function every time a user is updated
create trigger on_auth_user_updated
after update on auth.users
for each row execute procedure on_auth_user_updated();
