-- ===========================================
-- Arrival Drink App - Seed Data
-- ===========================================

-- Create tables
CREATE TABLE IF NOT EXISTS airports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iata_code text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS water_quality (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id uuid NOT NULL REFERENCES airports(id) ON DELETE CASCADE,
  hardness_mg_l float8 NOT NULL,
  hardness_level text NOT NULL CHECK (hardness_level IN ('soft', 'moderate', 'hard', 'very_hard')),
  is_drinkable boolean NOT NULL,
  taste_note text,
  source_note text,
  last_verified date,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE airports ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_quality ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read" ON airports FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read" ON water_quality FOR SELECT USING (true);

-- ===========================================
-- Airport Data + Water Quality
-- ===========================================

-- ===== Asia =====

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('NRT', 'Narita International Airport', 'Tokyo', 'Japan', 35.7647, 140.3864);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'NRT'), 60, 'soft', true, '軽くてすっきりした味わい。ミネラル感が少ない', '東京都水道局・利根川水系', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('HND', 'Haneda Airport', 'Tokyo', 'Japan', 35.5494, 139.7798);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'HND'), 60, 'soft', true, '成田と同じ東京の水道水。クリーンで飲みやすい', '東京都水道局・多摩川水系', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('KIX', 'Kansai International Airport', 'Osaka', 'Japan', 34.4347, 135.2440);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'KIX'), 45, 'soft', true, '非常に軟らかくまろやかな味', '大阪市水道局・淀川水系', '2025-02-01');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('ICN', 'Incheon International Airport', 'Seoul', 'South Korea', 37.4602, 126.4407);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'ICN'), 50, 'soft', true, '軟水で飲みやすいが、地元では浄水器を使う人も多い', 'ソウル市上水道・漢江水系', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('PEK', 'Beijing Capital International Airport', 'Beijing', 'China', 40.0799, 116.6031);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'PEK'), 200, 'very_hard', false, '非常に硬く、石灰分が多い。ボトル水を推奨', '北京市水道・地下水混合', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('PVG', 'Shanghai Pudong International Airport', 'Shanghai', 'China', 31.1443, 121.8083);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'PVG'), 140, 'hard', false, '硬めでやや塩素臭がある。煮沸しても飲用推奨されない', '上海市水道・長江水系', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('BKK', 'Suvarnabhumi Airport', 'Bangkok', 'Thailand', 13.6900, 100.7501);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'BKK'), 80, 'moderate', false, '中程度の硬度だが水道インフラの問題で飲用非推奨', 'バンコク都水道・チャオプラヤー川', '2025-02-01');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('SIN', 'Changi Airport', 'Singapore', 'Singapore', 1.3502, 103.9944);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'SIN'), 40, 'soft', true, '高度に処理された軟水。世界トップクラスの水道水質', 'PUB Singapore・NEWater/貯水池', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('HKG', 'Hong Kong International Airport', 'Hong Kong', 'China', 22.3080, 113.9185);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'HKG'), 35, 'soft', true, '軟水で品質は良いが、古い建物の配管の影響に注意', '香港水務署・東江水系', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('DEL', 'Indira Gandhi International Airport', 'Delhi', 'India', 28.5562, 77.1000);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'DEL'), 250, 'very_hard', false, '非常に硬い地下水。ボトル水の使用を強く推奨', 'デリー水道局・ヤムナー川/地下水', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('TPE', 'Taiwan Taoyuan International Airport', 'Taipei', 'Taiwan', 25.0797, 121.2342);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'TPE'), 50, 'soft', true, '軟水で飲みやすい。台北の水道水質は高品質', '台北自来水事業処・翡翠水庫', '2025-02-01');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('MNL', 'Ninoy Aquino International Airport', 'Manila', 'Philippines', 14.5086, 121.0194);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'MNL'), 100, 'moderate', false, '中程度の硬度。水道インフラの老朽化により飲用非推奨', 'Manila Water/Maynilad', '2025-01-15');

-- ===== Europe =====

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('LHR', 'Heathrow Airport', 'London', 'United Kingdom', 51.4700, -0.4543);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'LHR'), 280, 'very_hard', true, '非常に硬いが安全。石灰質の味がはっきりわかる', 'Thames Water・テムズ川/地下水', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('CDG', 'Charles de Gaulle Airport', 'Paris', 'France', 49.0097, 2.5479);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'CDG'), 250, 'very_hard', true, '硬水だが飲用可能。カルシウム分が多い', 'Eau de Paris・セーヌ川/地下水', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany', 50.0379, 8.5622);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'FRA'), 190, 'very_hard', true, 'ドイツの水道水は高品質だが硬い。ミネラル豊富', 'フランクフルト市水道・地下水', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('AMS', 'Amsterdam Airport Schiphol', 'Amsterdam', 'Netherlands', 52.3105, 4.7683);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'AMS'), 150, 'hard', true, '硬めだが品質は高い。オランダの水道水は世界的に高評価', 'Waternet・砂丘濾過水', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('FCO', 'Leonardo da Vinci International Airport', 'Rome', 'Italy', 41.8003, 12.2389);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'FCO'), 220, 'very_hard', true, 'ローマの水は石灰岩由来で非常に硬いが、味は良い', 'ACEA・湧水/帯水層', '2025-02-01');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('MAD', 'Adolfo Suárez Madrid-Barajas Airport', 'Madrid', 'Spain', 40.4983, -3.5676);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'MAD'), 70, 'moderate', true, 'シエラ山脈の雪解け水由来で比較的軟らかい', 'Canal de Isabel II・山岳貯水池', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('BCN', 'Josep Tarradellas Barcelona-El Prat Airport', 'Barcelona', 'Spain', 41.2974, 2.0833);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'BCN'), 200, 'very_hard', true, '非常に硬く塩素味もある。多くの住民はボトル水を好む', 'Aigües de Barcelona・リョブレガート川', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('MUC', 'Munich Airport', 'Munich', 'Germany', 48.3537, 11.7750);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'MUC'), 170, 'hard', true, 'アルプスの地下水由来で硬いが非常に高品質', 'Stadtwerke München・アルプス地下水', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('ZRH', 'Zurich Airport', 'Zurich', 'Switzerland', 47.4647, 8.5492);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'ZRH'), 140, 'hard', true, 'スイスの水道水は世界最高水準。硬めだが美味しい', 'チューリッヒ市水道・湖水/湧水', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('CPH', 'Copenhagen Airport', 'Copenhagen', 'Denmark', 55.6180, 12.6508);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'CPH'), 200, 'very_hard', true, 'デンマークの水は地下水100%で硬いが品質は最高級', 'HOFOR・地下水', '2025-02-01');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('IST', 'Istanbul Airport', 'Istanbul', 'Turkey', 41.2753, 28.7519);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'IST'), 130, 'hard', false, '硬水で塩素処理が強い。ボトル水の使用を推奨', 'ISKI・ダム貯水', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('ATH', 'Athens International Airport', 'Athens', 'Greece', 37.9364, 23.9445);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'ATH'), 90, 'moderate', true, '中程度の硬度で飲みやすい。ギリシャ本土は水質良好', 'EYDAP・マラソン湖/人工湖', '2025-01-20');

-- ===== Americas =====

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('JFK', 'John F. Kennedy International Airport', 'New York', 'United States', 40.6413, -73.7781);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'JFK'), 30, 'soft', true, 'ニューヨークの水は非常に軟らかく美味しいと有名', 'NYC DEP・キャッツキル/デラウェア水系', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('LAX', 'Los Angeles International Airport', 'Los Angeles', 'United States', 33.9425, -118.4081);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'LAX'), 160, 'hard', true, '硬めで塩素味がある。多くの住民は浄水器を使用', 'LADWP・コロラド川/地下水', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('SFO', 'San Francisco International Airport', 'San Francisco', 'United States', 37.6213, -122.3790);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'SFO'), 25, 'soft', true, '全米でも屈指の軟水。ヨセミテの雪解け水由来', 'SFPUC・ヘッチヘッチー貯水池', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('ORD', 'O''Hare International Airport', 'Chicago', 'United States', 41.9742, -87.9073);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'ORD'), 140, 'hard', true, '五大湖の水で硬めだが品質は良い', 'Chicago DWM・ミシガン湖', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('MIA', 'Miami International Airport', 'Miami', 'United States', 25.7959, -80.2870);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'MIA'), 180, 'hard', true, '石灰岩帯水層由来で硬い。飲用可能だが味の好みが分かれる', 'WASD・ビスケーン帯水層', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('GRU', 'São Paulo/Guarulhos International Airport', 'São Paulo', 'Brazil', -23.4356, -46.4731);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'GRU'), 50, 'soft', false, '軟水だが水道インフラの問題でボトル水を推奨', 'Sabesp・カンタレイラ水系', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('MEX', 'Benito Juárez International Airport', 'Mexico City', 'Mexico', 19.4363, -99.0721);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'MEX'), 120, 'moderate', false, '中程度の硬度だが飲用非推奨。ボトル水を使用すること', 'SACMEX・地下水/遠隔水源', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('YYZ', 'Toronto Pearson International Airport', 'Toronto', 'Canada', 43.6777, -79.6248);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'YYZ'), 130, 'hard', true, '五大湖の水で硬めだが安全で飲みやすい', 'Toronto Water・オンタリオ湖', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('EZE', 'Ministro Pistarini International Airport', 'Buenos Aires', 'Argentina', -34.8222, -58.5358);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'EZE'), 100, 'moderate', true, '中程度の硬度で飲用可能。味は問題なし', 'AySA・ラプラタ川', '2025-02-01');

-- ===== Oceania / Africa / Middle East =====

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('SYD', 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia', -33.9461, 151.1772);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'SYD'), 50, 'soft', true, '軟水で非常に飲みやすい。オーストラリアの水道水は高品質', 'Sydney Water・ウォーラガンバダム', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('AKL', 'Auckland Airport', 'Auckland', 'New Zealand', -37.0082, 174.7850);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'AKL'), 30, 'soft', true, '非常に軟らかくクリーン。NZの水は世界最高水準', 'Watercare・ワイタケレダム', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('DXB', 'Dubai International Airport', 'Dubai', 'United Arab Emirates', 25.2532, 55.3657);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'DXB'), 80, 'moderate', true, '海水淡水化処理済みで中程度。飲用可能だがボトル水を好む人が多い', 'DEWA・海水淡水化プラント', '2025-01-10');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('DOH', 'Hamad International Airport', 'Doha', 'Qatar', 25.2731, 51.6081);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'DOH'), 70, 'moderate', true, '淡水化水で中程度の硬度。品質は良いが味の好みで分かれる', 'Kahramaa・海水淡水化', '2025-01-15');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('JNB', 'O.R. Tambo International Airport', 'Johannesburg', 'South Africa', -26.1367, 28.2411);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'JNB'), 60, 'soft', true, '軟水で飲みやすい。南アフリカの都市部水道は高品質', 'Rand Water・バール川水系', '2025-01-20');

INSERT INTO airports (iata_code, name, city, country, latitude, longitude) VALUES
('NBO', 'Jomo Kenyatta International Airport', 'Nairobi', 'Kenya', -1.3192, 36.9278);
INSERT INTO water_quality (airport_id, hardness_mg_l, hardness_level, is_drinkable, taste_note, source_note, last_verified)
VALUES ((SELECT id FROM airports WHERE iata_code = 'NBO'), 90, 'moderate', false, '中程度の硬度だがインフラの問題で飲用非推奨', 'Nairobi Water・ンダカイニダム', '2025-01-10');

-- ===========================================
-- Migration: Add image_url column to airports
-- ===========================================
-- Run this separately if the airports table already exists.
-- After adding the column, upload images to Supabase Storage
-- (bucket: airport-images, public access) and update the URLs below.

ALTER TABLE airports ADD COLUMN IF NOT EXISTS image_url text;

-- Example UPDATE statements (replace URLs with your Supabase Storage URLs):
-- UPDATE airports SET image_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/airport-images/NRT.jpg' WHERE iata_code = 'NRT';
-- UPDATE airports SET image_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/airport-images/JFK.jpg' WHERE iata_code = 'JFK';
