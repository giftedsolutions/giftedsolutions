-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  unit TEXT DEFAULT 'each',
  description TEXT,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  order_items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read access)
CREATE POLICY "Allow public read access to active products"
  ON products FOR SELECT
  USING (is_active = true);

-- RLS Policies for orders (anyone can insert, but only service role can read/update)
CREATE POLICY "Allow public insert to orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial inventory data
INSERT INTO products (name, category, price, unit) VALUES
  -- A. ARDUINO & DEVELOPMENT BOARDS
  ('Arduino Uno + USB Cable', 'A. DEVELOPMENT BOARDS', 750, 'each'),
  ('Arduino Nano + Cable', 'A. DEVELOPMENT BOARDS', 450, 'each'),
  ('Atmega 328P Microcontroller Set', 'A. DEVELOPMENT BOARDS', 400, 'each'),
  ('Arduino Nano Terminal Adapter', 'A. DEVELOPMENT BOARDS', 250, 'each'),
  ('Arduino Mega Atmega2560 + Cable', 'A. DEVELOPMENT BOARDS', 1000, 'each'),
  ('ESP8266 NodeMCU', 'A. DEVELOPMENT BOARDS', 800, 'each'),
  ('ESP32 WiFi Module + OV2640 CAM', 'A. DEVELOPMENT BOARDS', 800, 'each'),
  ('ESP32 NodeMCU WROVER', 'A. DEVELOPMENT BOARDS', 800, 'each'),
  ('ESP32 S3 devitc WIFI+BLUETOOTH', 'A. DEVELOPMENT BOARDS', 1000, 'each'),
  ('ZY-ESP32 WIFI+BLUETOOTH', 'A. DEVELOPMENT BOARDS', 800, 'each'),
  ('Arduino Starter Kit UNO R3 Based', 'A. DEVELOPMENT BOARDS', 2000, 'each'),
  ('Arduino starter kit Mega Based', 'A. DEVELOPMENT BOARDS', 2500, 'each'),

  -- B. SENSORS & MODULES
  ('Fingerprint sensor FPM10A', 'B. SENSORS & MODULES', 950, 'each'),
  ('MQ-3 Gas Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('DHT11 Temp & Humidity Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('ACS712 Current Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('ZMPT101B Voltage Sensor', 'B. SENSORS & MODULES', 300, 'each'),
  ('IR Obstacle Avoidance Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('PIR Motion Sensor HC-SR501', 'B. SENSORS & MODULES', 250, 'each'),
  ('HC-SR04 Ultrasonic Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('10k Potentiometer', 'B. SENSORS & MODULES', 100, 'each'),
  ('LM35 Temperature Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('Soil Moisture Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('Arduino Sound Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('Pulse Heart Rate Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('MQ-2 Smoke & LPG Gas Sensor', 'B. SENSORS & MODULES', 250, 'each'),
  ('MQ-7 Carbon Monoxide & Gas Sensor', 'B. SENSORS & MODULES', 300, 'each'),
  ('MQ-135 Air Quality Sensor', 'B. SENSORS & MODULES', 300, 'each'),
  ('1M Trimmer Potentiometer', 'B. SENSORS & MODULES', 100, 'each'),
  ('PZEM V3.0 Multi-Sensor', 'B. SENSORS & MODULES', 1500, 'each'),

  -- C. DISPLAY & INTERFACE MODULES
  ('16x2 LCD with I2C', 'C. DISPLAY & INTERFACE', 350, 'each'),
  ('20x4 LCD Display', 'C. DISPLAY & INTERFACE', 450, 'each'),
  ('4x4 Membrane Keypad', 'C. DISPLAY & INTERFACE', 250, 'each'),
  ('Micro SD Card Module', 'C. DISPLAY & INTERFACE', 250, 'each'),

  -- D. COMMUNICATION MODULES
  ('SIM900 GSM GPRS Shield', 'D. COMMUNICATION', 1000, 'each'),
  ('SIM800L GSM Module + Antenna', 'D. COMMUNICATION', 800, 'each'),
  ('RFID Reader Set', 'D. COMMUNICATION', 300, 'each'),

  -- E. MOTORS & MOTOR DRIVERS
  ('Nema 17 Stepper Motor', 'E. MOTORS & DRIVERS', 650, 'each'),
  ('L298N Motor Driver', 'E. MOTORS & DRIVERS', 250, 'each'),
  ('L293D Motor Driver IC', 'E. MOTORS & DRIVERS', 100, 'IC'),
  ('TB6600 Stepper Motor Driver', 'E. MOTORS & DRIVERS', 800, 'each'),
  ('45g SpringRC Servo Motor', 'E. MOTORS & DRIVERS', 650, 'each'),
  ('9g servo motors', 'E. MOTORS & DRIVERS', 200, 'each'),

  -- F. RELAY MODULES & POWER CONTROL
  ('5V 4-Channel Relay Module', 'F. RELAY & POWER CONTROL', 350, 'each'),
  ('5V 10A Single-Channel Relay', 'F. RELAY & POWER CONTROL', 150, 'each'),
  ('5V 2-Channel Relay Jumper', 'F. RELAY & POWER CONTROL', 250, 'each'),
  ('5V 2-Channel Relay Screw', 'F. RELAY & POWER CONTROL', 250, 'each'),
  ('5V 1-Channel Relay Screw', 'F. RELAY & POWER CONTROL', 150, 'each'),

  -- G. POWER SUPPLY & VOLTAGE REGULATORS
  ('7805 / 7812 Voltage Regulators', 'G. POWER SUPPLY & REGULATORS', 65, 'IC'),
  ('LM2596 DC-DC Step-down Module', 'G. POWER SUPPLY & REGULATORS', 250, 'each'),
  ('9V 1A DC Power Supply', 'G. POWER SUPPLY & REGULATORS', 300, 'each'),
  ('9V Battery Clip Holder with DC Jack', 'G. POWER SUPPLY & REGULATORS', 95, 'each'),
  ('9V Snap Power Cable with DC Jack', 'G. POWER SUPPLY & REGULATORS', 95, 'each'),
  ('9V Battery Non-rechargeable', 'G. POWER SUPPLY & REGULATORS', 85, 'each'),

  -- H. BREADBOARDS KITS & MISC
  ('Breadboard Jumper Wires per piece', 'H. BREADBOARDS & MISC', 8, 'per piece'),
  ('830 Point Breadboard', 'H. BREADBOARDS & MISC', 350, 'each'),
  ('170 Point Breadboard', 'H. BREADBOARDS & MISC', 130, 'each'),
  ('400P Breadboard', 'H. BREADBOARDS & MISC', 200, 'each'),
  ('NE555 Timer IC', 'H. BREADBOARDS & MISC', 105, 'each'),
  ('DFPlayer Mini MP3 Module', 'H. BREADBOARDS & MISC', 200, 'each'),

  -- I. OTHER COMPONENTS
  ('USB to TTL Converter', 'I. OTHER COMPONENTS', 250, 'each'),
  ('DS3231 RTC Clock Module', 'I. OTHER COMPONENTS', 250, 'each'),
  ('PAM8403 Audio Amplifier Module', 'I. OTHER COMPONENTS', 120, 'each'),
  ('12V DC Small Electromagnetic Lock', 'I. OTHER COMPONENTS', 350, 'each'),
  ('20KG Load Cell + HX711 Module', 'I. OTHER COMPONENTS', 450, 'each'),
  ('5v non submissable pump +battery', 'I. OTHER COMPONENTS', 350, 'each'),
  ('Resistors', 'I. OTHER COMPONENTS', 20, 'each'),
  ('Push Button Switch', 'I. OTHER COMPONENTS', 25, 'each'),
  ('LEDs', 'I. OTHER COMPONENTS', 10, 'each'),
  ('2N4402 Transistor', 'I. OTHER COMPONENTS', 25, 'each')
ON CONFLICT DO NOTHING;

