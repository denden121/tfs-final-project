import React, {useRef, useState} from 'react';
import {Button, Container, TextField} from "@material-ui/core";
import {checkLink} from "../helpers/link.helper";
import LinkApi from "../api/link.api";
import styles from './main.module.scss';
import {Link} from "react-router-dom";
import {LinkInterface} from "../dto/link.interface";
import {path} from "../const/consts";

const QRCode = require('qrcode.react');

export function MainPage() {
    const [generateLink, setGenerateLink] = useState<LinkInterface>({link: '', generateLink: ''});
    const [error, setError] = useState('');

    const linkRef = useRef<HTMLInputElement>(null);

    const GenerateShort = async () => {
        if (!linkRef.current || !linkRef.current?.value) {
            setError('Введите ссылку))')
            return
        }
        const url = linkRef.current.value;
        if(!checkLink(url)) {
            setError('Введите корректные ссылки')
            return
        }
        try {
            const link = await LinkApi.getGenerateLink({link: url });
            setError('');
            setGenerateLink(link);
        }catch (e) {
            setError('Не удалось получить данные с сервера');
        }
    }

    return (
        <Container maxWidth="sm">

            <div>
                <div className={styles.label}><h1>ShortLink</h1></div>
                <div className={styles.main__input}>
                    <TextField
                        fullWidth={true}
                        inputRef={linkRef}
                        label="Ссылка"
                        variant="outlined"
                    />
                </div>

                {error && <div className={styles.main__error}>{error}</div>}

                <div className={styles.main__button}>
                    <Button  onClick={GenerateShort} variant="contained" color="secondary">
                        Сгенерировать
                    </Button>
                </div>

                {generateLink.generateLink &&
                <>
                  <p>Ccылка:</p>
                  <div className={styles.main__link}>
                    <a target="_blank" rel="noreferrer" href={`${path}/link/${generateLink.generateLink}`}>{`${path}/link/${generateLink.generateLink}`}</a>
                  </div>
                  <p>Qr-code:</p>
                  <div className={styles.main__qr}>
                    <QRCode value={`${path}/link/${generateLink.generateLink}`} />
                  </div>
                </>}

                <div>
                    <p>Довольно часто при общении в интернете люди пересылают друг другу ссылки. Иногда эти ссылки бывают длинными. Совсем иногда — очень длинными. Но почти всегда — слишком длинными. Для того чтобы избавиться от этой проблемы, был создан этот сайт. Да, я знаю, что таких тысячи, но этот же лучше!</p>

                    <p>А дальше все просто: вставляете ссылку в поле для ввода, нажимаете "Генерация" и получаете короткий, совсем короткий URL.</p>

                    <p>Самые популярные ссылки <Link to={'/popular'}>тут</Link></p>
                </div>
            </div>
        </Container>
    );
}

