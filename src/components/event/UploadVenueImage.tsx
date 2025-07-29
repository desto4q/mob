import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import TextPrimary from '../texts/text';
import tw from '../../lib/tailwind';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { uploadImage } from '../../utils/helpers/uploadImage';

const UploadVenueImage = ({ setImages, venueImage }) => {
    const [imageList, setImageList] = useState(venueImage ?? []);
    const [isLoading, setIsLoading] = useState(false);  // Loading state for image upload

    const handleAddImages = async () => {
        setIsLoading(true);  // Set loading state to true when starting upload
        const { isLoading: uploadLoading, isSuccess, imageUrl } = await uploadImage(false); // false means use image picker, not camera

        if (isSuccess && imageUrl) {
            // If the upload was successful, add the image URL to the list
            setImageList(prevList => [...prevList, imageUrl]);
            setImages(prev => [...prev, imageUrl]); // Optionally pass to parent component
        } else {
            // Handle error (image upload failed)
            console.error('Image upload failed');
        }

        setIsLoading(false);  // Set loading state to false after upload is complete
    };

    const handleRemoveImage = (index) => {
        setImageList(prevList => prevList.filter((_, i) => i !== index));
    };

    return (
        <View>
            <View>
                <TextPrimary size={13} style={tw`pb-3`}>
                    Venue Images (optional)
                </TextPrimary>

                <View style={tw`flex-row flex-wrap items-center gap-4`}>
                    {imageList.map((imageUri, index) => (
                        <View
                            key={index}
                            style={tw`relative h-24 w-24 justify-center items-center border border-dashed border-[#2E2F36] rounded-[10px] overflow-hidden`}
                        >
                            <Image source={{ uri: imageUri }} style={tw`h-full w-full`} resizeMode="cover" />
                            <Pressable
                                style={tw`absolute top-1 right-1 bg-gray-800 p-1 rounded-full`}
                                onPress={() => handleRemoveImage(index)}
                            >
                                <AntDesign name="close" size={20} color="red" />
                            </Pressable>
                        </View>
                    ))}

                    {/* Show the loader if image is being uploaded */}
                    {isLoading ? (
                        <View style={tw`h-20 w-20 rounded-full justify-center items-center`}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    ) : (
                        <Pressable
                            style={tw`bg-gray_dark h-20 w-20 rounded-full justify-center items-center`}
                            onPress={handleAddImages}
                        >
                            <FontAwesome6 name="plus" size={24} color="white" />
                        </Pressable>
                    )}
                </View>

                <TextPrimary size={11} style={tw`pt-3`}>
                    You can upload multiple images
                </TextPrimary>
            </View>
        </View>
    );
};

export default UploadVenueImage;

const styles = StyleSheet.create({});
