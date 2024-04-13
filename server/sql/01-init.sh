#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS bookshop;
  CREATE TABLE IF NOT EXISTS bookshop.cart (
      id uuid DEFAULT gen_random_uuid(),
      session_id character varying(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT cart_id PRIMARY KEY (id)
    );
  CREATE TABLE IF NOT EXISTS bookshop.cart_items(
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      cart_id uuid NOT NULL,
      item_id uuid NOT NULL,
      quantity INT NOT NULL,
      price INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT cart_item_id PRIMARY KEY (id),
      CONSTRAINT fk_image_id_cart_id FOREIGN KEY (cart_id) REFERENCES bookshop.cart(id)
    );
  CREATE ROLE $DB_USER WITH LOGIN ENCRYPTED PASSWORD '$DB_PASSWORD';
  GRANT USAGE ON SCHEMA bookshop TO $DB_USER;
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA bookshop TO $DB_USER;

EOSQL