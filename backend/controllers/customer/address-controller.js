import { Address } from "../../models/Address.js";

const createAddress = async(req, res) => {
  try {
    const newAddress = new Address(req.body);
    // Validate
    if (
      !(
        newAddress.userId &&
        newAddress.address &&
        newAddress.city &&
        newAddress.zipCode &&
        newAddress.phone
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required input. Please re-check the fields",
      });
    }
    //
    // Success
    await newAddress.save();
    res.status(201).json({
      success: true,
      data: newAddress,
      message: "Address added successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error adding address'
    })
  }
}

const getAllAddresses = async(req, res) => {
  try {
    const {userId} = req.params;
    // Validate user
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }
    //
    // Success
    const addresses = await Address.find({userId});
    res.status(200).json({
      success: true,
      data: addresses,
      message: "Address fetched successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching address'
    })
  }
}

const updateAddress = async(req, res) => {
  try {
    const {userId, addressId} = req.params;
    const updatedAddress = req.body; 
    // Validate
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }
    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid address",
      });
    }
    console.log('updateWith: ', updatedAddress)
    console.log('userId: ', userId)
    console.log('addressId: ', addressId)
    //
    // Find
    const foundAddress = await Address.findOne({_id: addressId, userId})
    //
    if (!foundAddress) {
        return res.status(404).json({
            success: false,
            message: "Address not found"
        })
    }
    console.log('foundInDB: ', foundAddress)
    //
    // Update
    Object.keys(updatedAddress).forEach((key) => {
      foundAddress[key] = updatedAddress[key];
    });
    await foundAddress.save();
    //
    // Success
    res.status(200).json({
      success: true,
      data: foundAddress,
      message: "Address updated successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error updating address'
    })
  }
}

const deleteAddress = async(req, res) => {
  try {
    const { userId, addressId } = req.params;
    const address = await Address.findOneAndDelete({ _id: addressId, userId})
    //
    // Validate
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    //
    // Success
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting address'
    })
  }
}

export {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress
}