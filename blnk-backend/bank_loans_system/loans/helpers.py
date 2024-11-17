def calculate_amortization_helper(principal, annual_rate, duration_years, precision=2):

    duration_months = duration_years * 12

    monthly_rate = (annual_rate / 100) / 12

    if monthly_rate > 0:
        monthly_payment = principal * (monthly_rate * (1 + monthly_rate)**duration_months) / ((1 + monthly_rate)**duration_months - 1)
    else:
        monthly_payment = principal / duration_months

    schedule = []
    balance = principal

    for month in range(1, duration_months + 1):
        interest_payment = balance * monthly_rate
        principal_payment = monthly_payment - interest_payment
        balance -= principal_payment

        schedule.append({
            "month": month,
            "payment": round(monthly_payment, precision),
            "interest_payment": round(interest_payment, precision),
            "principal_payment": round(principal_payment, precision),
            "remaining_balance": round(balance, precision)
        })

    return schedule
