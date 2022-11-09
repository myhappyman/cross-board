import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { Button, Form, Input, Label } from "./BasicTag";

interface IForm{
    category: string;
}

const AddBtn = styled(Button)`
    margin-left: 5px;
`;

function CategoryForm(){
    const setCategory = useSetRecoilState(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
  
    const onValid = ({category}:IForm) => {
        if(window.confirm(`'${category}'를 정말 추가하시겠습니까?`)){
            setCategory(prev => [...prev, category]);
            setToDos(prev => {
              return {
                ...prev,
                [category]: []
              }
            });
            setValue("category", "");
        }
    };

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Label htmlFor="category_text">Category</Label>
            <Input 
                {...register("category",
                {required: true})} 
                id="category_text"
                placeholder="Add to Category"
            />
            <AddBtn>추가</AddBtn>
        </Form>
    );
}

export default CategoryForm;