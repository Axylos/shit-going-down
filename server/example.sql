CREATE TABLE test (id TEXT PRIMARY KEY, name TEXT);

-- We name the trigger "trigger_test_genid" so that we can remove
-- or replace it later.
-- If an INSERT contains multiple RECORDs, each one will call
-- unique_short_id individually.
CREATE TRIGGER trigger_test_genid BEFORE INSERT ON test FOR EACH ROW EXECUTE PROCEDURE unique_short_id();
