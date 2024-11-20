create or replace function get_dashboard_counts() returns jsonb as $$
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
$$ language plpgsql;