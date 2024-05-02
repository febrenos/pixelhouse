import React, { useEffect, useState } from 'react';
import { CheckBox, ContentIcon, DeleteIcon, EditIcon, LoadingIcon, TextInput } from '../../../style';
import { Button, Text } from '../../index';
import { Flex } from '../../../style';
import { Delete } from '../../../assets/icons';
import api from '../../../services/pythonApi';
import * as Styled from './style';

export function UserCard({ list, type, onEditar, onUpdateList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(list.name);
  const [editBornIn, setEditBornIn] = useState(list.bornIn);
  const [editEmail, setEditEmail] = useState(list.email);
  const [editReceiveEmail, setEditReceiveEmail] = useState(list.receiveEmail);
  const [editReceiveSMS, setEditReceiveSMS] = useState(list.receiveSMS);
  const [editPassword, setEditPassword] = useState(list.password);

  const handleEditUser = async (id, editedUser) => {
    try {
      const response = await api.put(`/user/${id}`, editedUser);
      console.log("User edited successfully:", response.data);
  
      // Atualizar a lista de usuários após a edição
      onUpdateList();
    } catch (error) {
      console.error("Erro ao editar o usuário:", error);
      // Exibir uma mensagem de erro ou lidar com o erro de outra forma
    }
  };
  
  const handleDeleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);
      console.log("User deleted successfully:", response.data);
  
      // Atualizar a lista de usuários após a exclusão
      onUpdateList();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      // Exibir uma mensagem de erro ou lidar com o erro de outra forma
    }
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSavePress = () => {
    const editedUser = {
      name: editName,
      bornIn: editBornIn,
      email: editEmail,
      receiveEmail: editReceiveEmail,
      receiveSMS: editReceiveSMS,
      password: editPassword,
    };

    handleEditUser(list.id, editedUser);
    setIsEditing(false);
  };

  const handleDeletePress = () => {
    handleDeleteUser(list.id);
  };
  
  return (
    <Styled.Card>
      <Styled.SpaceBetween>
        <Text text={`${list.name}`} size={'md'} bold />
        <Flex>
          <EditIcon onClick={handleEditPress} />
          <DeleteIcon onClick={handleDeletePress}/>
        </Flex>
      </Styled.SpaceBetween>
      {isEditing ? (
        <>
        <Flex>
          <Text text="Nome:" bold size={'md'} />
          <TextInput type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
        </Flex>

        <Flex>
          <Text text="Nasc.:" bold size={'md'} />
          <TextInput type="text" value={editBornIn} onChange={(e) => setEditBornIn(e.target.value)} />
        </Flex>

        <Flex>
          <Text text="Email:" bold size={'md'} />
          <TextInput type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
        </Flex>

        <Flex>
          <Text text="Password:" bold size={'md'} />
          <TextInput type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
        </Flex>

        <Flex>
          <Text text="Email:" bold size={'md'} />
          <CheckBox checked={editReceiveEmail} onChange={(e) => setEditReceiveEmail(e.target.checked)} />
        </Flex>

        <Flex>
          <Text text="SMS:" bold size={'md'} />
          <CheckBox checked={editReceiveSMS} onChange={(e) => setEditReceiveSMS(e.target.checked)} />
        </Flex>

        <Button text="Salvar" size="sm" onClick={handleSavePress}/>
      </>
      ) : (
        <> 
        <Flex>
          <Text text="Id:" bold size={'md'} />
          <Text text={`${list.id}`} size={'md'} />
        </Flex>

        <Flex>
          <Text text="Nome:" bold size={'md'} />
          <Text text={`${list.name}`} size={'md'} />
        </Flex>

        <Flex>
          <Text text="Data Nasc.:" bold size={'md'} />
          <Text text={`${list.bornIn}`} size={'md'} />
        </Flex>

        <Flex>
          <Text text="Email:" bold size={'md'} />
          <Text text={`${list.email}`} size={'md'} />
        </Flex>

        <Flex>
          <Text text="Password:" bold size={'md'} />
          <Text text={`${list.password}`} size={'md'} />
        </Flex>

        <Flex>
          <Text text="Aceita Email:" bold size={'md'} />
          <Text text={`${list.receiveEmail}`} size={'md'} />
        </Flex>

        <Flex>
          <Text text="Aceita SMS:" bold size={'md'} />
          <Text text={`${list.receiveSMS}`} size={'md'} />
        </Flex>
      </>
      )}
    </Styled.Card>
  );
}

