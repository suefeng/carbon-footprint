def TONS_KWH(kwh, percentage): 
  # 1,540.1 lbs CO2/MWh × 1 metric ton/2,204.6 lbs × 0.001 MWh/kWh = 
  # 6.99 × 10^-4 metric tons CO2/kWh
  return format(kwh * (6.99 * 10**-4) * (int(percentage) / 100), '.2f')

  #return round(kwh * 0.709 * (int(percentage) / 100), 2)

def KG_TO_TON(kg):
  return format(kg * 0.0011, '.2f')

# 0.1 mmbtu/1 therm × 14.43 kg C/mmbtu × 44 kg CO2/12 kg C × 1 metric ton/1,000 kg = 0.0053 metric tons CO2/therm
def TONS_THERM(therm):
  return format(therm * 0.0053, '.2f')