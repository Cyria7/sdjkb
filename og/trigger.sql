create trigger trig1
after insert on detection
for each row
begin
delete from detections where detections.date<dateadd(day, -14, getdate())
end