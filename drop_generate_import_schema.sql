DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

create table country
(
  country_code  varchar(3) not null
    constraint country_pk
    primary key,
  gdppc2017     double precision,
  incomeLevel text,
  iso2code      text,
  iso3code      text,
  lendingType text,
  pop2017       bigint,
  region        text,
  wb_name       text,
  my_name       text,
  totDocs     bigint
);

alter table country
  owner to root;

create unique index country_country_code_uindex
  on country (country_code);



create table field
(
  field_code  text not null
    constraint field_pk
    primary key,
  name        text,
  level       text,
  scopus_code text,
  scopus_name text
);

alter table field
  owner to root;

create unique index field_field_code_uindex
  on field (field_code);


create table method
(
  method_code text not null
    constraint method_pk
    primary key,
  minmax     text,
  short_name text,
  full_name  text,
  short_desc text,
  long_desc  text,
  formula    text
);

alter table method
  owner to root;

create unique index method_id_uindex
  on method (method_code);

create table index
(
  country_code varchar(3) not null
    constraint index_country_country_code_fk
    references country,
  field_code   text
    constraint index_field_field_code_fk
    references field,
  method_code  text       not null
    constraint index_method_method_code_fk
    references method,
  period       integer    not null,
  value        double precision
);

alter table index
  owner to root;




\copy country(country_code,gdppc2017,incomeLevel,iso2code,lendingType,pop2017,region,wb_name,my_name,totDocs) from 'csv/country.csv' with delimiter ',' csv header;

\copy field(field_code,name,level,scopus_code,scopus_name) from 'csv/field.csv' with delimiter ',' csv header;

\copy method(method_code,minmax,short_name,full_name,short_desc,long_desc,formula) from 'csv/method.csv' with delimiter ',' csv header;

\copy index(country_code,field_code,method_code,period,value) from 'csv/index.csv' with delimiter ',' csv header;







