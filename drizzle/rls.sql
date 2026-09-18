-- Enable RLS on all user tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_plan_enrollments ENABLE ROW LEVEL SECURITY;

-- Policies: users manage own rows
CREATE POLICY "Users manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own highlights" ON highlights FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own prayers" ON prayers FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own enrollments" ON reading_plan_enrollments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Public reads for catalog
ALTER TABLE reading_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read plans" ON reading_plans FOR SELECT USING (true);
CREATE POLICY "Anyone can read plan days" ON reading_plan_days FOR SELECT USING (true);
CREATE POLICY "Anyone can read bible books" ON bible_books FOR SELECT USING (true);
CREATE POLICY "Anyone can read bible chapters" ON bible_chapters FOR SELECT USING (true);
