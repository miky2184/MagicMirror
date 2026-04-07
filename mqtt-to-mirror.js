const mqtt = require('mqtt');
const { exec } = require('child_process');

console.log('Avvio script MQTT...');

const client = mqtt.connect('mqtt://192.168.1.46:1883', {
    username: 'mqtt',
    password: 'kkpo2981'
});

function screenOn() {
    console.log('🔧 Accensione schermo...');
    
    // Metodo 1: Simula movimento mouse per risvegliare
    exec('DISPLAY=:0 xdotool mousemove_relative 1 1', (error) => {
        if (!error) {
            exec('DISPLAY=:0 xdotool mousemove_relative -- -1 -1');
            console.log('✅ Mouse simulato');
        }
    });
    
    // Metodo 2: Disattiva idle
    exec('dbus-send --session --dest=org.gnome.ScreenSaver --type=method_call /org/gnome/ScreenSaver org.gnome.ScreenSaver.SetActive boolean:false', (error) => {
        if (!error) {
            console.log('✅ ScreenSaver disattivato');
        }
    });
    
    console.log('💡 Movimento rilevato');
}

function screenOff() {
    console.log('🔧 Spegnimento schermo...');
    
    // Attiva screensaver/lock screen
    exec('dbus-send --session --dest=org.gnome.ScreenSaver --type=method_call /org/gnome/ScreenSaver org.gnome.ScreenSaver.SetActive boolean:true', (error) => {
        if (error) {
            console.error('❌ Errore:', error.message);
        } else {
            console.log('✅ ScreenSaver attivato');
        }
    });
    
    console.log('🌙 Nessun movimento');
}

client.on('connect', () => {
    console.log('✓ Connesso a MQTT broker 192.168.1.45:1883');
    client.subscribe('zigbee2mqtt/sensoremovimento', (err) => {
        if (err) {
            console.error('✗ Errore sottoscrizione:', err);
        } else {
            console.log('✓ Sottoscritto a: zigbee2mqtt/magicmirror');
        }
    });
});

client.on('error', (err) => {
    console.error('✗ Errore connessione MQTT:', err);
});

client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        
        if (data.occupancy === true) {
            screenOn();
        } else if (data.occupancy === false) {
            setTimeout(() => {
                screenOff();
            }, 120000); // 2 minuti
        }
    } catch (e) {
        console.error('✗ Errore parsing JSON:', e);
    }
});

console.log('Script in ascolto...');
