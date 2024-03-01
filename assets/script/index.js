'use strict';

const operatingSystem = document.querySelector('.operatingsystem');
const language = document.querySelector('.language');
const browser = document.querySelector('.browser');
const width = document.querySelector('.width');
const height = document.querySelector('.height');
const orientation = document.querySelector('.orientation');
const level = document.querySelector('.level');
const status = document.querySelector('.status');
const networkStatus = document.querySelector('.networkstatus');


// function for width and height
function readWindow() {
    width.innerText = `width: ${window.innerWidth}px`;
    height.innerText = `height: ${window.innerHeight}px`;
}
window.addEventListener('load', readWindow);
window.addEventListener('resize', readWindow);


// function to get browser name
function getBrowserName() {
    const userAgent = navigator.userAgent.toLowerCase();
    let browserName = '';

    if (userAgent.includes('firefox')) {
        browserName = "firefox";
    } else if (userAgent.includes('chrome')) {
        browserName = "chrome";
    } else if (userAgent.includes('safari')) {
        browserName = "safari";
    } else if (userAgent.includes('opr')) {
        browserName = "opera";
    } else if (userAgent.includes('edg')) {
        browserName = "Microsoft Edge";
    } else {
        browserName = 'unknown'
    }

    return browserName;
}
browser.innerText = `Browser: ${getBrowserName()}`;


// function for orientation
function updateOrientation() { 
    const orientationType = (window.innerWidth > window.innerHeight) ? 'Landscape': 'Portrait'; 
    orientation.innerText = `orientation: ${orientationType}`;
} 
updateOrientation();


// function for operating system
function getOperatingSystem() {
    const userAgent = navigator.userAgent.toLowerCase();

    let oSystem = '';
    if (userAgent.includes("windows")) {
        oSystem =  "Windows";
    } else if (userAgent.includes("mac")) {
        oSystem =  "Mac OS";
    } else if (userAgent.includes("linux")) {
        oSystem =  "Linux";
    } else {
        oSystem =  "Unknown";
    }
    operatingSystem.innerText = `Operating System: ${oSystem}`;
    return oSystem;
}
getOperatingSystem();


// fumction for battery information
function updateBatteryInfo(battery) {
    level.textContent = `level: ${(battery.level * 100).toFixed(1) + '%'}`;
    const statusOfBattery = battery.charging ? 'Charging': 'Idle';
    status.textContent = `status: ${statusOfBattery}`;
    
    battery.addEventListener('levelchange', () => {
        level.textContent = `level: ${battery.level * 100} + '%'`;
    });

    battery.addEventListener('chargingchange', () => {
        const statusOfBattery = battery.charging ? 'Charging': 'Idle';
        status.textContent = `status: ${statusOfBattery}`;
    });
}

if ('getBattery' in navigator) {
    navigator.getBattery().then(updateBatteryInfo).catch(error => {
        console.error('Error accessing the battery info:', error);
        level.textContent = 'Not available';
        status.textContent = 'Not available';
    });
} else {
    level.textContent = 'Not available';
    status.textContent = 'Not available';
}


// function for network status
function updateNetworkStatus() {
    
    if (navigator.onLine) {
      networkStatus.textContent = 'Online';
      networkStatus.classList.remove('offline');
      networkStatus.classList.add('online');
    } else {
      networkStatus.textContent = 'Offline';
      networkStatus.classList.remove('online');
      networkStatus.classList.add('offline');
    }
}
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();


// function for system language
const systemLanguage = navigator.language || navigator.userLanguage;
  language.textContent = 'Language: ' + systemLanguage;
