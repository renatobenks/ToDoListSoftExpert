import{ StyleSheet, css } from 'aphrodite';

export const FontRoboto = {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Roboto/roboto-regular.woff') format('woff2'), url('/public/fonts/Roboto/roboto-regular.woff') format('woff')"
};

export const FontRobotoMedium = {
    fontFamily: 'Roboto Medium',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Roboto/roboto-medium.woff') format('woff2'), url('/public/fonts/Roboto/roboto-medium.woff') format('woff')"
};

export const FontRobotoBlack = {
    fontFamily: 'Roboto Black',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Roboto/roboto-black.woff') format('woff2'), url('/public/fonts/Roboto/roboto-black.woff') format('woff')"
};

export const FontRobotoCondensed = {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/RobotoCondensed/robotocondensed-regular.woff') format('woff2'), url('/public/fonts/RobotoCondensed/robotocondensed-regular.woff') format('woff')"
};

export const FontRobotoCondensedBold = {
    fontFamily: 'Roboto Condensed Bold',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/RobotoCondensed/robotocondensed-bold.woff') format('woff2'), url('/public/fonts/RobotoCondensed/robotocondensed-bold.woff') format('woff')"
};

export const GetStylesComponent = styles => StyleSheet.create(styles);

export default StyleSheet.create({
    divTitle: {
        margin: '0 0 2rem 0'
    },
    imageTitle: {
        width: '25%',
        height: 'auto',
        margin: '10px 0'
    },
    imageRounded: {
        borderRadius: '50%'
    },
    noMargin: {
        margin: '0'
    },
    fontRoboto: {
        fontFamily: [FontRobotoMedium, 'sans-serif']
    },
    fontBodySize: {
        fontSize: '2rem'
    },
    fontBodyApp: {
        fontFamily: [FontRobotoMedium, 'sans-serif'],
        fontSize: '2rem'
    },
    fontTitle: {
        fontFamily: [FontRobotoCondensedBold, 'sans-serif'],
        fontWeight: '800',
        fontSize: '4rem'
    },
    fontSubtitle: {
        fontFamily: [FontRobotoBlack, 'sans-serif'],
        fontWeight: '600',
        fontSize: '1.5rem'
    },
    colorTitleSubtitle: {
        color: 'rgba(102, 102, 102, .6)'
    },
    fullWidth: {
        width: '100%'
    },
    divFullWidth: {
        width: '100%'
    },
    divAlignFlex: {
        display: 'flex'
    },
    divAddTodo: {
        margin: '0',
        padding: '10px'
    },
    buttonAddTodo: {
        textTransform: 'uppercase',
        border: 'none',
        background: 'transparent',
        padding: '5px',
        position: 'absolute',
        height: 'auto',
        outline: 'none',
        fontSize: '2rem'
    },
    inputAddTodo: {
        border: '1px solid transparent',
        background: 'none',
        fontSize: '2rem',
        padding: '5px 0 5px 2em',
        outline: 'none',
        transition: 'border 0.3s 0.15s ease-in-out',
        ':active': {
            borderColor: 'transparent',
            boxShadow: 'none',
            borderBottom: '1px solid rgb(192, 192, 192)'
        },
        ':focus': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        }
    },
    normal: {
        color: '#aaa'
    },
    urgent: {
        color: 'red'
    },
    important: {
        color: 'yellow'
    }
});
