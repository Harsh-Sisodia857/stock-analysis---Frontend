import { toast } from "react-toastify";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 5;
};

export const displayErrors = (errors) => {
  console.log("ERRORS : ", errors);
  Object.values(errors).forEach((error) => {
    if (error) {
      toast.error(error);
    }
  });
};

export const mutualFundInfo = {
  scheme_name:
    "The name of the mutual fund scheme (e.g., 'XYZ Growth Fund'). It represents the specific investment option offered by the Asset Management Company (AMC).",

  min_sip:
    "Minimum SIP (Systematic Investment Plan) amount required to invest monthly in the fund (e.g., ₹1000). SIP allows you to invest regularly over time.",

  min_lumpsum:
    "Minimum lumpsum investment amount required to make a one-time investment in the fund (e.g., ₹1000).",

  expense_ratio:
    "The percentage of the fund’s total assets used annually to cover its management costs. A lower expense ratio means more of your money is invested, while a higher ratio indicates higher management fees.",

  fund_size_cr:
    "Fund size refers to the total assets under management (AUM) by the mutual fund, usually expressed in crores (e.g., ₹500 crores). A larger fund size may indicate stability and credibility, but it may also limit flexibility in making investments.",

  fund_age_yr:
    "The age of the mutual fund in years, representing how long the fund has been in operation. Older funds may have more data to assess historical performance.",

  fund_manager:
    "The person or team responsible for managing the fund’s portfolio, making investment decisions, and ensuring the fund performs according to its objectives.",

  sortino:
    "The Sortino ratio measures the risk-adjusted return by considering only the downside volatility (negative returns). A higher Sortino ratio indicates better performance relative to the downside risk.",

  alpha:
    "Alpha is a performance measure that compares the fund’s returns to the returns expected based on its risk (benchmark). A positive alpha means the fund has outperformed its benchmark, while a negative alpha indicates underperformance.",

  sd: "Standard deviation (SD) is a measure of how much the fund’s returns vary from the mean (average). A higher SD indicates more volatility and higher risk.",

  beta: "Beta measures the sensitivity of the fund’s returns to overall market movements. A beta of 1 indicates that the fund’s returns move in line with the market, while a beta greater than 1 means higher volatility, and a beta less than 1 indicates lower volatility compared to the market.",

  sharpe:
    "The Sharpe ratio is a risk-adjusted performance measure that compares the return of the fund to its volatility (standard deviation). A higher Sharpe ratio indicates better risk-adjusted returns, meaning the fund provides better returns for the level of risk taken.",

  risk_level:
    "Risk level is usually rated on a scale of 1 to 5, where 1 is low risk and 5 is high risk. This indicates how volatile or risky the fund is. For example, a risk level of 1 indicates low risk, typically associated with debt funds.",

  amc_name:
    "The name of the Asset Management Company (AMC) managing the mutual fund. AMCs are responsible for managing and administering the fund's investments.",

  rating:
    "A rating (usually on a scale of 1 to 5) reflects the quality and past performance of the fund. A rating of 3 generally indicates an average performance compared to peers.",

  category:
    "The fund's category determines the type of assets it invests in. A Hybrid fund typically invests in both equity (stocks) and debt (bonds), offering a balance between risk and return.",

  sub_category:
    "The sub-category provides further detail about the specific type of Hybrid fund. For example, a Balanced Hybrid fund focuses on a balance between debt and equity investments.",
};

