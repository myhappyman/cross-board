import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { Button, Form, Input, Label } from "./BasicTag";

interface IForm{
    category: string;
}

function CategoryForm(){
    const setToDos = useSetRecoilState(toDoState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
  
    const onValid = ({category}:IForm) => {
        if(window.confirm(`'${category}'를 정말 추가하시겠습니까?`)){
            setToDos(prev => {
              return {
                ...prev,
                [category]: []
              }
            });
            setValue("category", "");
        }
    }

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Label htmlFor="category_text">Category </Label>
            <Input 
                {...register("category",
                {required: true})} 
                id="category_text"
                placeholder="Add to Category"
            />
            <Button>추가</Button>
        </Form>
    );
}

export default CategoryForm;