import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { IDevice, IUpdateProps } from "../../interfaces";
import { db } from "../../firebase";

const initialState: {
  loading: boolean;
  devices: IDevice[];
  detailDevice: IDevice;
} = {
  loading: false,
  devices: [],
  detailDevice: {} as IDevice,
};
const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDetailDevice: (state, action: PayloadAction<IDevice>) => {
      state.detailDevice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchAllDevice.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const fetchAllDevice = createAsyncThunk("fetAllDevice", async () => {
  let data: IDevice[] = [];
  const querySnapshot = await getDocs(collection(db, "devices"));
  querySnapshot.forEach((doc) => {
    data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IDevice);
  });
  return data;
});

export const addDevice = createAsyncThunk(
  "addDevice",
  async (device: IDevice) => {
    let res;
    try {
      const ref = await addDoc(collection(db, "devices"), { ...device });
      res = ref.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return res;
  }
);

export const updateDevice = createAsyncThunk(
  "updateDevice",
  async ({ id, payload }: IUpdateProps) => {
    const ref = doc(db, "devices", id);
    await updateDoc(ref, { ...payload });
  }
);

export default deviceSlice;
