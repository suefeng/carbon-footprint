# calculations from 
# https://www.epa.gov/energy/learn-about-energy-and-its-impact-environment
# https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references

import consts

def tons_kwh(kwh, percentage): 
  # 1,540.1 lbs CO2/MWh × 1 metric ton/2,204.6 lbs × 0.001 MWh/kWh = 
  # 6.99 × 10^-4 metric tons CO2/kWh where the percentage is the percentage of energy source that's fossil fuel
  return format(kwh * (6.99 * 10**-4) * (int(percentage) / 100), '.2f')

def kg_to_tons(kg):
  return format(kg * 0.0011, '.2f')

def tons_therm(therm):
  # 0.1 mmbtu/1 therm × 14.43 kg C/mmbtu × 44 kg CO2/12 kg C × 1 metric ton/1,000 kg = 
  # 0.0053 metric tons CO2/therm
  return format(therm * 0.0053, '.2f')

def tons_gas(miles):
  # 8,887 grams of CO2/gallon of gasoline = 
  # 8.887 × 10-3 metric tons CO2/gallon of gasoline
  gallons = miles / consts.MPG
  return format(gallons * (8.887 * 10**-3), '.2f')

def tons_passenger(miles):
  # 0.0002 metric tons CO2/passenger mile on a plane
  return format(miles * 0.0002, '.2f')

def tons_co2(miles, type):
    if miles > 0 and type == "car":
        return tons_gas(miles) 
    elif miles > 0 and type == "airplane":
        return tons_passenger(miles)
    else:
        return 0
    
def tons_water(cons):
  # https://www.brightest.io/calculate-carbon-footprint-water-emissions
  # regular use water has an emissions factor of approximately 0.340 to 0.46 kg of CO2 per cubic meter of water
  # 1 Cubic Meter = 264.172052 Gallons (Fluid, US)
  cubic_meter = (cons * 1000) / 264.172052
  return format((cubic_meter * 0.0004), '.4f')