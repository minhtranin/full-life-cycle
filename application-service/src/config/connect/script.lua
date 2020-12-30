local rcall = redis.call;
-- local res = rcall("set", "connect1", "connected")
local getExist = rcall("exists", "connect1")
if getExist == 0 then return "dung" else return "sai" end
return getExist