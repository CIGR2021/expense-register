import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PaymentList(props) {
  const { expensesLabel } = props;

  const structure = () => {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  };

  return (
    <table>
      {structure()}
      <tbody>
        {expensesLabel.map((item) => {
          const exchange = item.exchangeRates[item.currency];
          const name = exchange.name.split('/')[0];
          const currency = exchange.ask;
          const value = parseFloat(currency).toFixed(2);
          const real = parseFloat(item.value * currency).toFixed(2);

          return (
            <tr key={name}>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{value}</td>
              <td>{name}</td>
              <td>{real}</td>
              <td>Real</td>
              <td>
                <button type='button'>Deletar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => ({
  expensesLabel: state.wallet.expenses,
});

PaymentList.propTypes = {
  expensesLabel: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(PaymentList);
