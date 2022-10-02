import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
            color: '#ffffff',
            marginLeft: 10,
        },
    },
    grow: {
        flexGrow: 1,
    },
    main: {
        minHeight: '80vh',
    },
    footer: {
        marginTop: 10,
        textAlign: 'center',
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    icons: {
        marginRight: 20,
    },
    description: {
        textAlign: 'justify',
    },
});

export default useStyles;