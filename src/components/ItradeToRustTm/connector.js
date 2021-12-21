const connector = ({
    main: {
        itrade,
        rustTm,
        valute,
    },
    itradeToRustTm: {
        settings,
    },
}) => ({
    itrade,
    rustTm,
    valute,
    settings,
});

export default connector;