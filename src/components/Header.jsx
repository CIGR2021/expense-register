import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

function Header(props) {
  const { email, expensesLabel } = props;
  const currencyConversion = expensesLabel;
  const arrayconver = [];

  currencyConversion.map((item) => {
    const money = item.currency;
    const exchange = item.exchangeRates[money];
    const real = item.value * exchange.ask;
    arrayconver.push(real);

    return arrayconver;
  })

  const total = arrayconver
    .reduce((acc, num) => acc + parseFloat(num), 0);
  
  return (
    <header>
      <h1>Expense Register</h1>
      <h4>{ email }</h4>
      <h4>
        Total de despesas:
        {' '}
        { total.tofixed(2) }
      </h4>
      <h4>BRL</h4>
    </header>
  )
}

const mapStateToProps = state => ({
  email: state.user.email,
  expensesLabel: state.wallet.expenses
});

Header.propTypes = ({
  email: PropTypes.string.isRequired
});

export default connect(mapStateToProps)(Header);
