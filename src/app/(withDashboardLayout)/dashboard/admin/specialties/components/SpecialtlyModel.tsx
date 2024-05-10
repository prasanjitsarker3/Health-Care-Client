"use client";
import {
  useCreateSpecialtiesMutation,
  useGetAllSpecialtiesQuery,
} from "@/Redux/Specialties/specialitiesApi";
import { modifyPayload } from "@/Server/Payload/ModifyPayload";
import FromFileUpload from "@/components/From/FromFileUpload";
import FromInput from "@/components/From/FromInput";
import FromProvider from "@/components/From/FromProvider";
import CusModal from "@/components/Modal/CusModal";
import { Box, Button, Grid, TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type IModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpecialtiesModel = ({ open, setOpen }: IModalProps) => {
  const [createSpecialties] = useCreateSpecialtiesMutation();

  const handleCreateSpecialties = async (values: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const data = modifyPayload(values);
    try {
      const res = await createSpecialties(data).unwrap();

      if (res?.id) {
        setOpen(false);
        toast.success("Specialties Created Successfully !", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res.message, { id: toastId, duration: 2000 });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <CusModal
        open={open}
        setOpen={setOpen}
        title="Create Doctors Specialties"
      >
        <Box px={5}>
          <FromProvider onSubmit={handleCreateSpecialties}>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FromInput
                  fullWidth={true}
                  size="small"
                  label="Specialties"
                  name="title"
                />
              </Grid>
              <Grid item md={12}>
                <FromFileUpload name="file" label="Upload file" />
              </Grid>
            </Grid>
            <Button
              sx={{ mt: 3, mb: 3 }}
              fullWidth={true}
              autoFocus
              type="submit"
            >
              Create Specialties
            </Button>
          </FromProvider>
        </Box>
      </CusModal>
    </div>
  );
};

export default SpecialtiesModel;
