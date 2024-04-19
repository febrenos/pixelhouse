import React, {useEffect, useState} from 'react'
import {Button, Input, UserCardList, Text} from '../../index'
import {useNavigate } from 'react-router-dom';
import * as Styles from './style'
import { CheckBox } from '../userCard/style';
import { Flex } from '../../../style';
import api from '../../../services/pythonApi';

const userList = [
    {
      id: 1,
      name: 'Luana java',
      bornIn: '2009-18-09',
      email: 'email@gmail.com',
      password: 'test',
      receiveEmail:true,
      receiveSMS: true
    },
    {
        id: 2,
        name: 'Rodolfo css',
        bornIn: '2003-28-10',
        email: 'email@gmail.com',
        password: 'test',
        receiveEmail: false,
        receiveSMS: false
      },
];

export function AccessCard() {
    const [userList, setUserList] = useState([]);

    const [isRegister,setIsRegister] = useState(false)
    const [name, setName] = useState('Julia Csharp');
    const [bornIn, setBornIn] = useState('2002-08-24');
    const [email, setEmail] = useState('email@gmail.com');
    const [receiveEmail, setReceiveEmail] = useState(false);
    const [receiveSMS, setReceiveSMS] = useState(false);
    const [password, setPassword] = useState('senha123');
    const [confirmPassword, setConfirmPassword] = useState('senha123');

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

    const RegisterUser = async () => {
        try {
            const newUser = {
                name: name,
                bornIn: bornIn,
                email: email,
                password: password,
                receiveEmail: receiveEmail,
                receiveSMS: receiveSMS
            };
    
            const response = await api.post("/user", newUser);
            console.log("User registered successfully:", response.data);
    
            // Limpar os campos após o cadastro
    
            // Exibir mensagem de sucesso ou redirecionar para outra página
            // Você pode fazer isso usando um estado para controlar a exibição de uma mensagem ou redirecionamento
        } catch (error) {
            console.error("Erro ao cadastrar o usuário:", error.response.data.message);
            // Exibir uma mensagem de erro para o usuário
            // Você pode definir um estado para armazenar a mensagem de erro e exibi-la no componente
        }
        getUser();
    }    
    
    

    const navigate = useNavigate()
    const loginOn = () => {
        setIsRegister(false);
    };
    const loginOff = () => {
        setIsRegister(true);
    };
    // const login = () =>{
    //     navigate('/about-us')
    // }

    return(
            <Styles.Card>
                <Styles.ContentButtonCard>
                    <Styles.UnderButtonCard/>
                    <Styles.ButtonCardLogin isRegister={!isRegister} onClick={loginOn}>Listagem</Styles.ButtonCardLogin>
                    <Styles.ButtonCardRegister isRegister={isRegister} onClick={loginOff}>Cadastro</Styles.ButtonCardRegister>
                </Styles.ContentButtonCard>
                <Styles.Content>
                    <Styles.UserIcon/>
                    {isRegister &&
                        <>
                            <Input name="name" type="email" placeholder="Email" value={name} onChange={(e) => setName(e.target.value)} />
                            <Input name="bornIn" placeholder="Data Nascimento" value={bornIn} onChange={(e) => setBornIn(e.target.value)} />
                            <Input name="email" type="password" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Input name="confirmPassword" type="password" placeholder="Conf. Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <Flex>
                                <Flex/>
                                    <Text text="Email:" bold size={'md'} />
                                    <CheckBox checked={receiveEmail} onChange={(e) => setReceiveEmail(e.target.checked)} />
                                <Flex/>

                                <Flex/>
                                    <Text text="SMS:" bold size={'md'} />
                                    <CheckBox checked={receiveSMS} onChange={(e) => setReceiveSMS(e.target.checked)} />
                                <Flex/>
                            </Flex>
                            <Button text="Cadastrar" onClick={RegisterUser} />
                        </>
                    }
                    {!isRegister &&
                        <>
                            <UserCardList list={userList}/>
                        </>
                    }
                </Styles.Content>
            </Styles.Card>
    )
}