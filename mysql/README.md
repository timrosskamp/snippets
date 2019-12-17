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

* [What MySQL data type should be used for Latitude/Longitude with 8 decimal places? stackoverflow.com](https://stackoverflow.com/questions/12504208/what-mysql-data-type-should-be-used-for-latitude-longitude-with-8-decimal-places)
* [Genauigkeit von Koordinaten openstreetmap.org](https://wiki.openstreetmap.org/wiki/DE:Genauigkeit_von_Koordinaten)
