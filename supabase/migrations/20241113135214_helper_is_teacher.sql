create or replace function is_teacher() returns boolean as $$
begin
    return exists (
        select 1 from roles_tb where user_id = auth.uid() and role = 'teacher'
    );
end;
$$ language plpgsql security definer;