import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  currencyNow,
  fetchCurrency,
  totalExpensesExport,
} from '../actions/index.js';
import OptionPayment from './options/OptionPayment.jsx';
import OptionExpenses from './options/OptionExpenses.jsx';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
};

function Form(props) {
  const [state, setState] = useState(INITIAL_STATE);

  const { currencies } = props;

  useEffect(() => {
    currencies();
  });

  const validateType = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { currencyDispath } = props;
    const oldState = state;
    currencyDispath(oldState);
    const { id } = state;

    setState({
      ...oldState,
      id: id + 1,
    });
  };

  const structure = () => {
    const { description, method, tag } = state;

    return (
      <>
        <label htmlFor='metodo'>
          Método de pagamento:
          <select
            type='text'
            id='metodo'
            name='method'
            onChange={validateType}
            value={method}
          >
            <OptionPayment />
          </select>
        </label>
        <label htmlFor='despesas'>
          Tag:
          <select
            type='despesas'
            name='tag'
            onChange={validateType}
            value={tag}
          >
            <OptionExpenses />
          </select>
        </label>
        <label htmlFor='descricao'>
          Descrição:
          <input
            type='text'
            id='descricao'
            name='description'
            onChange={validateType}
            value={description}
          />
        </label>
      </>
    );
  };

  const { currencyLabel } = props;
  const { value, currency } = state;

  return (
    <form>
      <label htmlFor='valor'>
        Valor:
        <input
          type='number'
          id='valor'
          name='value'
          onChange={validateType}
          value={value}
        />
      </label>
      <label htmlFor='moeda'>
        Moeda:
        <select
          id='moeda'
          name='currency'
          onChange={validateType}
          value={currency}
        >
          {Object.values(currencyLabel).map((item) => (
            <option key={item.code} name={item.name}>
              {item.code}
            </option>
          ))}
        </select>
      </label>
      {structure()}
      <button type='submit' onClick={handleClick}>
        Adicionar despesa
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  expensesLabel: state.wallet.expenses,
  currencyLabel: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrency()),
  currencyDispath: (state) => dispatch(currencyNow(state)),
  totalExpenses: (state) => dispatch(totalExpensesExport(state)),
});

Form.propTypes = {
  currencyLabel: PropTypes.shape(),
  currencies: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
