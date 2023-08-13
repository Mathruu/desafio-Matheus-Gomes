class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.0 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.5 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.2 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.5 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.5 }
        ];

        const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];

        const itensMap = new Map();

        // Preencher o mapa com os itens e suas quantidades
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (!itensMap.has(codigo)) {
                itensMap.set(codigo, 0);
            }
            itensMap.set(codigo, itensMap.get(codigo) + parseInt(quantidade));
        }

        let valorTotal = 0;

        // Verificar se há itens no carrinho de compra
        if (itensMap.size === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        for (const [codigo, quantidade] of itensMap) {
            const itemCardapio = cardapio.find(item => item.codigo === codigo);

            if (!itemCardapio) {
                return 'Item inválido!';
            }

            if (quantidade === 0) {
                return 'Quantidade inválida!';
            }

            valorTotal += itemCardapio.valor * quantidade;
        }

        // Verificar se algum item extra está sem o item principal correspondente
        if (itensMap.has('chantily') && !itensMap.has('cafe')) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (itensMap.has('queijo') && !itensMap.has('sanduiche')) {
            return 'Item extra não pode ser pedido sem o principal';
        }
            

        // Verificar a forma de pagamento
        if (!formasDePagamentoValidas.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        // Calcular desconto ou juros
        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5% no pagamento em dinheiro
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplicar juros de 3% no pagamento em crédito
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
