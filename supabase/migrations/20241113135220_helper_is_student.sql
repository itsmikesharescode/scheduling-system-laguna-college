create or replace function is_student() returns boolean as $$
begin
    return exists (
        select 1 from roles_tb where user_id = auth.uid() and role = 'student'
    );
end;
$$ language plpgsql security definer;