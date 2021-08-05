import React, {useEffect, useState} from "react";
import LinkApi from "../api/link.api";
import {Button, Container, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import styles from "./popular.module.scss"
import {LinkInterface} from "../dto/link.interface";
import {path} from "../const/consts";


export function PopularPage() {
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [error, setError] = useState('');
    const history = useHistory()
    useEffect(() => {
           LinkApi.getAllLinksAsync()
            .then((result)=>setLinks(result))
            .catch(() => setError('Не удалось получить данные с сервера'));
    },[])
    return(
        <>
            <Container maxWidth="lg">
                <div className={styles.header}>
                    <h1>Популярные ссылки</h1>
                    <Button onClick={() => history.push('/')} variant="contained" color="secondary">
                        Назад
                    </Button>
                </div>
                {error
                    ? <div>{error}</div>
                    : <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ссылка</TableCell>
                                <TableCell align="left">Сгенерованная ссылка</TableCell>
                                <TableCell align="left">Количество переходов</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {links.map((link) => (
                                <TableRow key={link.generateLink}>
                                    <TableCell component="th" scope="row">
                                        <a href={link.link}>{link.link.slice(0, 50)}...</a>
                                    </TableCell>
                                    <TableCell align="left"><a
                                        href={`${path}/link/${link.generateLink}`}>{`${path}/link/${link.generateLink}`}</a></TableCell>
                                    <TableCell align="left">{link.count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </Container >
        </>
    )
}
