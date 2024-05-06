import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type FromProviderProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFromConfig;

const FromProvider = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: FromProviderProps) => {
  const formConfig: TFromConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      </FormProvider>
    </>
  );
};

export default FromProvider;
