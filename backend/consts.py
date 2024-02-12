def KG_KWH(kwh, percentage): 
  return round(kwh * 0.709 * (int(percentage) / 100), 2)

def KG_TO_TON(kg):
  return format(kg * 0.0011, '.2f')

# 0.1 mmbtu/1 therm × 14.43 kg C/mmbtu × 44 kg CO2/12 kg C × 1 metric ton/1,000 kg = 0.0053 metric tons CO2/therm
def KG_THERM(therm):
  return format(therm * 0.0053, '.2f')