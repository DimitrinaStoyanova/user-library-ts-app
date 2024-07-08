import { Controller } from "react-hook-form";
import { type UserArticleFormProps } from "../../../types/user";
import ErrorMessage from "../../ui/ErrorMessage";

const UserArticleBodyField = (props: UserArticleFormProps) => {
  const { control, errors } = props;

  return (
    <>
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="user-article-body">Body</label>
            <textarea
              id="user-article-body"
              {...field}
              className="form-control"
              autoComplete="off"
              rows={10} 
            />
          </div>
        )}
        rules={{ required: "Required field" }}
      />
      {errors?.body && <ErrorMessage error={errors.body} />}
    </>
  );
};

export default UserArticleBodyField;
