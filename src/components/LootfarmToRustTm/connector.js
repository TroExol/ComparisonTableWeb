const connector = ({
    main: {
        lootfarm,
        rustTm,
        valute,
    },
    lootfarmToRustTm: {
        settings,
    },
}) => ({
    lootfarm,
    rustTm,
    valute,
    settings,
});

export default connector;