import React from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../assets/images/Logo.png'

const footerAboutLinks = [
    {
        display: "Toutes nos recettes",
        path: "/about"
    },
    {
        display: "Besoin d'aide ?",
        path: "/about"
    },
    {
        display: "Comment ça marche",
        path: "/about"
    },
    {
        display: "Rappel produit",
        path: "/about"
    },
    {
        display: "Du lundi au dimanche de 09h00 à 22h00",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "Notre Blog",
        path: "/about"
    },
    {
        display: "Rejoignez-nous",
        path: "/about"
    },
    // {
    //     display:"aaa",
    //     icon:"bx bxs-basket",
    //     path: "/about",
    // }
    
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                        À propos
                        </div>
                        <div className="footer__content">
                            <p>
                            Contactez-nous au  <strong>0123456722</strong>
                            </p>
                            <p>
                            Contactez-nous au  <strong>01234567333</strong>
                            </p>
                            <p>
                            Contactez-nous au  <strong>0123456789</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                        Les coulisses
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                        Restons connectés
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                        La cuisine du Ecofood, en un tour de main
                        Produits de saison, techniques et astuces de cuisine, bien manger au quotidien.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
