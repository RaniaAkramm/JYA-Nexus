# JYA Nexus AI Engine - Core Logic
# This script processes IoT data and predicts future values

import random
import time

class JYANexusAI:
    def __init__(self):
        self.sensor_history = {
            "temperature": [],
            "humidity": [],
            "co2": []
        }

    def process_data(self, sensor_type, value):
        """Simulate real-time data processing"""
        self.sensor_history[sensor_type].append(value)
        if len(self.sensor_history[sensor_type]) > 50:
            self.sensor_history[sensor_type].pop(0)
            
        return self.predict_future(sensor_type)

    def predict_future(self, sensor_type):
        """Simple prediction logic based on current trend"""
        history = self.sensor_history[sensor_type]
        if len(history) < 2:
            return "Collecting more data..."
            
        trend = history[-1] - history[-2]
        predicted = history[-1] + (trend * 1.5)
        
        return {
            "current": round(history[-1], 2),
            "prediction": round(predicted, 2),
            "trend": "rising" if trend > 0 else "falling"
        }

# Example of how the engine works locally
if __name__ == "__main__":
    ai = JYANexusAI()
    print("JYA Nexus AI Engine Started...")
    
    for i in range(5):
        temp = 22 + random.uniform(0, 2)
        result = ai.process_data("temperature", temp)
        print(f"Update {i+1}: {result}")
        time.sleep(1)
