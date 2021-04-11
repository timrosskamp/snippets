#include <Arduino.h>
#include <time.h>
#include <TZ.h>

// https://werner.rothschopf.net/201802_arduino_esp8266_ntp.htm

#define LOCAL_TIMEZONE TZ_Europe_Berlin
#define NTP_SERVERS "0.de.pool.ntp.org", "1.de.pool.ntp.org", "2.de.pool.ntp.org"

time_t now;
tm tm;

void updateTime() {
    time(&now);
    localtime_r(&now, &tm);
}

void setup() {
    // call before connecting to WiFi
    configTime(LOCAL_TIMEZONE, NTP_SERVERS);
}

void loop() {

}
