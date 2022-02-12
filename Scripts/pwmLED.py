import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
servoPIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)
p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz

p.start(2.5) # Initialization
print("Start")
time.sleep(1)
p.ChangeDutyCycle(7.5)
print("Down")
time.sleep(1)
p.ChangeDutyCycle(12.5)
print("Up")
time.sleep(1)

#Cleanup everything
p.stop()
GPIO.cleanup()
