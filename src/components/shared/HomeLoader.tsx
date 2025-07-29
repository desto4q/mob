import SkeletonLoading from "expo-skeleton-loading";

import * as Skeleton from "expo-skeleton-loading";
import { FlatList, StyleSheet, View } from "react-native";
import PageContainer from "../PageContainer";
import tw from "../../lib/tailwind";
console.log(Skeleton);

const HomeLoader = () => {
  return (
    <PageContainer style={tw`pt-20 flex-1`} padding={0}>
      <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#adadad",
              borderRadius: 10,
            }}
          />
         

          <View style={{ flex: 1, marginLeft: 10 }}>
            <View
              style={{
                backgroundColor: "#adadad",
                width: "50%",
                height: 10,
                marginBottom: 3,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: "#adadad",
                width: "20%",
                height: 8,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                backgroundColor: "#adadad",
                width: "15%",
                height: 8,
                borderRadius: 5,
                marginTop: 3,
              }}
            />
          </View>
        </View> */}

        <FlatList
          data={["", "", "", ""]}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View
                style={{
                    width: 150,
                  height: 150,
                  backgroundColor: "#adadad",
                  borderRadius: 10,
                }}
              />
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()} // ensure each item has a unique key
          columnWrapperStyle={styles.columnWrapper} // sets horizontal gap
          contentContainerStyle={styles.listContainer} // for overall styling
        />
      </SkeletonLoading>
    </PageContainer>
  );
};

export default HomeLoader;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1, // ensures items take up equal space
    // half of the desired vertical gap (10px)
    marginVertical: 12,
    marginHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingVertical: 5, // extra space if needed at the top/bottom of list
  },
});
