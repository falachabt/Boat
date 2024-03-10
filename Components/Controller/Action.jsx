import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../../utils/colors'

const Action = ({ icon, name = "C" ,  activeAction =  () => {} , inactiveAction =  () => {}  }) => {
    const [active, setActive] = useState(false);

    const handlePress = () => {
        setActive(!active);
        if (active) {
            inactiveAction(); // Exécutez l'action lorsque le bouton est inactif
        } else {
            activeAction(); // Exécutez l'action lorsque le bouton est actif
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, active ? styles.buttonActive : null]}
            onPress={handlePress}
            // activeOpacity={0.6}
        >
            {icon ? ( // Si une icône est fournie, affichez l'icône
                icon
            ) : ( // Sinon, affichez l'initiale de la lettre par défaut
                <Text style={styles.buttonText}> { name } </Text>
            )}
        </TouchableOpacity>
    )
}

export default Action

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonActive: {
        backgroundColor: colors.accent,
        transform: [{ translateY: 2 }],
    },
    buttonText: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
})
