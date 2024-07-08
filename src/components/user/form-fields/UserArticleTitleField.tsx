import { Controller } from "react-hook-form";
import { type UserArticleFormProps } from "../../../types/user";
import ErrorMessage from "../../ui/ErrorMessage";

const UserArticleTitleField = (props: UserArticleFormProps) => {
  const { control, errors } = props;

  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="user-article-title">Title</label>
            <input
              id="user-article-title"
              type="text"
              {...field}
              className="form-control"
              autoComplete="off"
            />
          </div>
        )}
        rules={{ required: "Required field" }}
      />
      {errors?.title && <ErrorMessage error={errors.title} />}
    </>
  );
};

export default UserArticleTitleField;
