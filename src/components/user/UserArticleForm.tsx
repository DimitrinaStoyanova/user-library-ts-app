import { useForm } from "react-hook-form";
import { type UserArticle, NewUserArticle, PopupMode } from "../../types/user";
import {
  useUpdateUserArticleMutation,
  useCreateUserArticleMutation,
} from "../../store/api/userApi";
import UserArticleTitleField from "./form-fields/UserArticleTitleField";
import UserArticleBodyField from "./form-fields/UserArticleBodyField";

interface UserArticleFormProps {
  userId: number;
  toggleFormPopup: (mode: PopupMode) => void;
  initialData?: UserArticle;
}

const UserArticleForm = (props: UserArticleFormProps) => {
  const { initialData, userId, toggleFormPopup } = props;

  const getDefaultValues = (initialData: UserArticle | undefined) => ({
    id: initialData?.id ?? undefined,
    userId: initialData?.userId ?? userId,
    title: initialData?.title ?? "",
    body: initialData?.body ?? "",
  });

  const defaultValues = getDefaultValues(initialData);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewUserArticle | UserArticle>({
    defaultValues,
  });

  const [createUserArticle] = useCreateUserArticleMutation();
  const [updateUserArticle] = useUpdateUserArticleMutation();

  const handleCreateUserArticle = async (data: NewUserArticle) => {
    try {
      const { id, ...createArticleData } = data;
      await createUserArticle(createArticleData).unwrap();
      toggleFormPopup('CREATE')
    } catch (error) {
      console.log("handleCreateUserArticle error", error);
    }
  };

  const handleUpdateUserArticle = async (data: UserArticle) => {
    try {
      const id = data.id;
      await updateUserArticle({ id, data }).unwrap();
      toggleFormPopup('UPDATE')
    } catch (error) {
      console.log("handleUpdateProduct error", error);
    }
  };

  const onSubmit = async (data: UserArticle | NewUserArticle) => {
    if (!data) return;

    if ("id" in data && data.id) {
      await handleUpdateUserArticle(data as UserArticle);
    } else {
      await handleCreateUserArticle(data as NewUserArticle);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-2"
    >
      <UserArticleTitleField control={control} errors={errors} />
      <UserArticleBodyField control={control} errors={errors} />

      <div className="d-flex justify-content-end py-3">
        <button type="submit" className="btn btn-primary w-25">
          Save
        </button>
      </div>
    </form>
  );
};

export default UserArticleForm;
