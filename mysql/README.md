# MySQL

## Datentypen für Koordinaten

```mysql
lat DECIMAL(10, 8) NOT NULL, lng DECIMAL(11, 8) NOT NULL
```

Additionally, you will see that float values rounded.

```
// e.g: given values 41.0473112,29.0077011

float(11,7) | decimal(11,7)
---------------------------
41.0473099  | 41.0473112
29.0077019  | 29.0077011
```

* [stackoverflow.com - What MySQL data type should be used for Latitude/Longitude with 8 decimal places?](https://stackoverflow.com/questions/12504208/what-mysql-data-type-should-be-used-for-latitude-longitude-with-8-decimal-places)
* [openstreetmap.org - Genauigkeit von Koordinaten](https://wiki.openstreetmap.org/wiki/DE:Genauigkeit_von_Koordinaten)

## Umkreissuche nach Koordinaten

Rows in einer Tabelle werden nach ihrer Entfernung (`:radius`) zu `:lat1` und `:lng1` gefiltert.

```mysql
SQRT((111.3 * COS((:lat1 + field_lat) / 2 * (PI()/180)) * (:lng1 - field_lng)) * (111.3 * COS((:lat1 + field_lat) / 2 * (PI()/180)) * (:lng1 - field_lng)) + (111.3 * (:lat1 - field_lat)) * (111.3 * (:lat1 - field_lat))) < :radius
```

* [Entfernungsberechnung (kompf.de/gps/distcalc.html)](https://www.kompf.de/gps/distcalc.html)
