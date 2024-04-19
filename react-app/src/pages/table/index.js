import React, { useEffect, useState } from 'react'
import { Text } from '../../components/index'
import { PageContent } from '../../style'
import * as Styles from './style';
import api from '../../services/pythonApi';

export function Table() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await api.get("/user");
            const users = response.data.userList;
            setUserList(users);
            console.log(users);
        } catch (error) {
            console.error("Erro ao fazer a solicitação à API:", error);
        }
    }

    return(
        <>
            <PageContent>
                <Styles.Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Born In</th>
                            <th>Email</th>
                            <th>Receive Email</th>
                            <th>Receive SMS</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.bornIn}</td>
                                <td>{user.email}</td>
                                <td>{user.receiveEmail ? 'Yes' : 'No'}</td>
                                <td>{user.receiveSMS ? 'Yes' : 'No'}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </Styles.Table>
            </PageContent>
        </>
    )
}
